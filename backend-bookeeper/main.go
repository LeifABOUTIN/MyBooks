package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2/bson"
)

// var port string = "8080"


var ctx context.Context
// var cancel context.CancelFunc
var collectionAccounts *mongo.Collection
type accountBody struct {
	Account string `json:"account"`
	Password string `json:"password"`
	Admin bool  `json:"admin"`
}

// type bookshelf struct {
// 	Id		string
// 	Account string
// 	Password string
// 	Admin bool
// }
func hashingPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}
func createBookShelf(c * gin.Context){
	var requestBody accountBody

	if err := c.BindJSON(&requestBody); err != nil {
		println(err)
		return
	}
	
	hash, _ := hashingPassword(requestBody.Password)
	requestBody.Password = hash
	newBookShelf := accountBody{
		Account: requestBody.Account,
		Password: hash,
		Admin: false,
	}
	result, err := collectionAccounts.InsertOne(ctx, newBookShelf)
	if err != nil {
		println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err})
		return
	}
	c.IndentedJSON(http.StatusOK, result)
}
func getAllBookshelves(c *gin.Context){
	cur, currErr := collectionAccounts.Find(ctx, bson.M{})
	if currErr != nil {
		panic(currErr)
	}
	defer cur.Close(ctx)
	var accounts []bson.M
	for cur.Next(ctx){
		var account bson.M
		err := cur.Decode(&account)
		if err != nil {
			log.Fatal(err)
		}
		accounts = append(accounts, account)
	}
	c.IndentedJSON(http.StatusOK, accounts)
	
}
func loginToBookeeper(c* gin.Context){
	var requestBody accountBody

	if err := c.BindJSON(&requestBody); err != nil {
		println(err)
		return
	}


	var account bson.M
	if err := collectionAccounts.FindOne(ctx, bson.M{"account": requestBody.Account}).Decode(&account); err != nil {
		log.Fatal(err)
	}
	if account["password"] != requestBody.Password {
		
		c.IndentedJSON(http.StatusForbidden, gin.H{"message": "password is incorrect."})
	
		return 
	}
	c.IndentedJSON(http.StatusAccepted, account)
}

func main(){
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://Leif:Kleenex31001827!@cluster0.0mzkd.mongodb.net/Bookshelf?retryWrites=true&w=majority"))
	if err != nil {
		log.Fatal(err)
	}
	ctx = context.Background()
	
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}
	collectionAccounts = client.Database("Bookshelf").Collection("accounts")

	router := gin.Default()
	router.GET("/bookshelves", getAllBookshelves)
	router.POST("/login", loginToBookeeper)
	router.POST("/register", createBookShelf)
	router.Run()
	fmt.Println("DB connected & Server Listening on port 8080")

 	
}
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/x/bsonx"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2/bson"
)

// var port string = "8080"


var router *gin.Engine
var ctx context.Context
var collectionAccounts *mongo.Collection
var collectionBooks *mongo.Collection
type accountBody struct {
	Account string `json:"account"`
	Password string `json:"password"`
	Admin bool  `json:"admin"`
}
type accountLogin struct {
	Account string `json:"account"`
	Password string `json:"password"`
}
type bookshelfBody struct {
	Owner string `bson:"owner" json:"owner"`
	Book string `bson:"book" json:"book"`

}
type bookshelf struct {
	Owner string `bson:"owner" json:"owner"`
	Books []string `bson:"books" json:"books"`
}

func getMyBookshelves(c * gin.Context){
	var requestBody bookshelfBody
	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Print(err)
	}
	var bookshelfObject bookshelf
	if err := collectionBooks.FindOne(ctx, bson.M{"owner": requestBody.Owner}).Decode(&bookshelfObject); err != nil {
		log.Fatal(err)
	}
	fmt.Print(bookshelfObject)
	c.IndentedJSON(http.StatusOK, bookshelfObject)

}
func addBookToBookeeper(c * gin.Context){
	var requestBody bookshelfBody

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println(err)
		
		return
	}
	var bookshelfObject bookshelf
	if err := collectionBooks.FindOne(ctx, bson.M{"owner": requestBody.Owner}).Decode(&bookshelfObject); err != nil {
		log.Fatal(err)
	}
	fmt.Println(bookshelfObject.Books)
	newCollection := append(bookshelfObject.Books, requestBody.Book)
	fmt.Println(newCollection)
	
	result, err := collectionBooks.ReplaceOne(ctx, bson.M{"owner": requestBody.Owner}, bson.M{"owner": requestBody.Owner, "books":newCollection})
	if err != nil {
	fmt.Println(err)
		c.IndentedJSON(http.StatusForbidden, gin.H{"error": err})
		return
	}
	fmt.Println(result)
	c.IndentedJSON(http.StatusOK, gin.H{"message": "Books added to the collection."})
	
	// if err != nil {
	
	// 	c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Bookeshelf already exists.", "error": err.Error(), "account": requestBody.Account})
	// 	return
	// }
	// var account accountLogin
	// if err := collectionAccounts.FindOne(ctx, bson.M{"account": requestBody.Owner}).Decode(&account); err != nil {
	// 	log.Fatal(err)
	// }

}
func hashingPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}
func checkPassword(password, hash string) (bool) {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
func createBookShelf(c * gin.Context){
	var requestBody accountBody

	if err := c.BindJSON(&requestBody); err != nil {
		println(err)
		return
	}
	
	hash, _ := hashingPassword(requestBody.Password)
	requestBody.Password = hash
	newAccount := accountBody{
		Account: requestBody.Account,
		Password: hash,
		Admin: false,
	}

	result, err := collectionAccounts.InsertOne(ctx, newAccount)
	if err != nil {
	
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Bookeshelf already exists.", "error": err.Error(), "account": requestBody.Account})
		return
	}
	newBookshelf := bookshelf{

		Owner: requestBody.Account,
	
	}
	resultBookshelf, err := collectionBooks.InsertOne(ctx, newBookshelf)
	if err != nil {
		c.IndentedJSON(http.StatusForbidden, gin.H{"message": "bookshelf not created"})
		return
	}
	println(resultBookshelf)
	c.IndentedJSON(http.StatusOK, result)
	

	

}
func getAllAccounts(c *gin.Context){
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
	var requestBody accountLogin

	if err := c.BindJSON(&requestBody); err != nil {
		println(err)
		return
	}


	var account accountLogin
	if err := collectionAccounts.FindOne(ctx, bson.M{"account": requestBody.Account}).Decode(&account); err != nil {
		log.Fatal(err)
	}
	// var password string

	
	result := checkPassword(requestBody.Password, account.Password )
	if !result{
		c.IndentedJSON(http.StatusForbidden, gin.H{"message": "password is incorrect."})
		return 
	}
	
	// session := sessions.Default(c)
	// session.Set("bookeeperCookie", "jesuisLEcookie?!")
	// session.Save()
	c.IndentedJSON(http.StatusOK, gin.H{"account":account.Account, "token": "#TuesBienLogaMonApplicaTionGoJefEraideLasecuPlusT4rd!"})
}

func main(){
	err := godotenv.Load(".env")
	if err != nil {	
		fmt.Println("Error loading .env")
	}else{
		fmt.Println(".env loaded")
	}
	client, err := mongo.NewClient(options.Client().ApplyURI(os.Getenv("DATABASE_URL")))
	if err != nil {
		log.Fatal(err)
	}
	ctx = context.Background()
	
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)
	


	collectionAccounts = client.Database("Bookshelf").Collection("accounts")
	collectionBooks = client.Database("Bookshelf").Collection("Books")
	indexOptions := options.Index().SetUnique(true)
	indexKeys := bsonx.MDoc{"account": bsonx.Int32(-1),}
	accountIndexModel := mongo.IndexModel{Options: indexOptions, Keys: indexKeys}
	

	indexName, err := collectionAccounts.Indexes().CreateOne(ctx, accountIndexModel)
	if err != nil {
		fmt.Println(err)
		return
	}
	println(indexName)
if err != nil {
	log.Fatalf("something went wrong: %+v", err)
}

	router = gin.Default()
	// cookie_store := cookie.NewStore([]byte("bookEEperCookie"))
  // router.Use(sessions.Sessions("session",cookie_store))
	router.GET("/bookshelves", getAllAccounts)
	router.POST("/my-books", getMyBookshelves)
	router.POST("/login", loginToBookeeper)
	router.POST("/register", createBookShelf)
	router.POST("/add-book", addBookToBookeeper)
	router.Run()
	fmt.Println("DB connected & Server Listening on port 8080")

 	
}
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import db from "./_db.js"
// types
import { typeDefs } from './schema.js'

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find((game) => args.id === game.id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find((author) => args.id === author.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find((review) => args.id === review.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => parent.id === review.game_id)
        }
    },
    Review: {
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id)
        },
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id === parent.id)
        }
    }
}

// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})


const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log('Server ready at port ', 4000)
import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
    id: '1',
    name: 'Dima',
    email: 'dima@example.com',
    age: 27
}, {
    id: '2',
    name: 'Bob',
    email: 'bob@example.com'
}, {
    id: '3',
    name: 'Kate',
    email: 'kate@example.com'
}];

// Demo user data
const posts = [
    {
        id: 1,
        title: 'GraphQL',
        body: 'This is the post about GraphQL',
        published: true
    },
    {
        id: 2,
        title: 'SOLID',
        body: 'This is the post about SOLID principals',
        published: true
    },
    {
        id: 3,
        title: 'NodeJS',
        body: 'This is the post about NodeJS',
        published: false
    },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
                return isTitleMatch || isBodyMatch
            })
        },
        me() {
            return {
                id: '123098',
                name: 'Bob',
                email: 'bob@example.com'
            }
        },
        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false
            }
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up!')
});

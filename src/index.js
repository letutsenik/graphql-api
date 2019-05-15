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

// Demo posts data
const posts = [
    {
        id: '1',
        title: 'GraphQL',
        body: 'This is the post about GraphQL',
        published: true,
        author: '1'
    },
    {
        id: '2',
        title: 'SOLID',
        body: 'This is the post about SOLID principals',
        published: true,
        author: '1'
    },
    {
        id: '3',
        title: 'NodeJS',
        body: 'This is the post about NodeJS',
        published: false,
        author: '2'
    },
];

// Demo comments data
const comments = [
    {
        id: '1',
        text: 'This is awesome post. I love it'
    },
    {
        id: '2',
        text: 'Cool! I like it. Keep posting!'
    },
    {
        id: '3',
        text: 'What exactly do you mean?'
    },
    {
        id: '4',
        text: 'I like it! Thanks for your post'
    },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
    
    type Comment {
        id: ID!
        text: String!
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
        comments(parent, args, ctx, info) {
            return comments

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
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
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

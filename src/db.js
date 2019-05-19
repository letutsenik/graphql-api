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
        text: 'This is awesome post. I love it',
        author: '1',
        post: '1'
    },
    {
        id: '2',
        text: 'Cool! I like it. Keep posting!',
        author: '1',
        post: '1'
    },
    {
        id: '3',
        text: 'What exactly do you mean?',
        author: '2',
        post: '3'
    },
    {
        id: '4',
        text: 'I like it! Thanks for your post',
        author: '3',
        post: '2'
    },
];

const db = {
    users,
    posts,
    comments
};

export { db as default }

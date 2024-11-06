let users = [
    {
        name: 'Robin Trachsel',
        requests: [
            {
                date: '2024-09-25',
                time: '12:00:00',
                endpoint: '/user',
                method: 'GET'
            },
            {
                date: '2024-09-25',
                time: '12:00:00',
                endpoint: '/user',
                method: 'POST'
            }
        ],
        sql: [
            {
                date: '2024-09-25',
                time: '12:00:00',
                query: 'SELECT * FROM users',
                valid: false
            }
        ]
    }
]

module.exports = users
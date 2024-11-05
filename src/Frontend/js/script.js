const url = "http://127.0.0.1"
const port = "3000"

document.addEventListener("DOMContentLoaded", () => {
    loadAdmin();
});

async function loadAdmin() {
    const result = await fetchAdmin()
    const tableBody = document.getElementById("table-body")

    tableBody.innerHTML = ""

    for(person in result) {
        const tr = document.createElement("tr");
        const tdPerson = document.createElement("td")
        const tdDropdown = document.createElement("td")

        tdPerson.classList.add("person")
        tdDropdown.classList.add("dropdown")

        const ul = document.createElement("ul")
        const liName = document.createElement("li")
        const liAmountRequests = document.createElement("li")
        const liAmountSQL = document.createElement("li")

        liName.innerText = result[person].name
        liAmountRequests.innerText = result[person].requests.length
        liAmountSQL.innerText = result[person].sql.length

        ul.appendChild(liName)
        ul.appendChild(liAmountRequests)
        ul.appendChild(liAmountSQL)

        tdPerson.appendChild(ul)
        
        for(sql in result[person].sql) {
            const ul = document.createElement("ul")
            const liDate = document.createElement("li")
            const liTime = document.createElement("li")
            const liQuery = document.createElement("li")

            liDate.innerText = result[person].sql[sql].date
            liTime.innerText = result[person].sql[sql].time
            liQuery.innerText = result[person].sql[sql].query

            ul.appendChild(liDate)
            ul.appendChild(liTime)
            ul.appendChild(liQuery)

            tdDropdown.appendChild(ul)
        }

        tr.appendChild(tdPerson)
        tr.appendChild(tdDropdown)

        // check if user has one or more SQL queries that are valid
        if (result[person].sql.length > 0) {
            for (sql in result[person].sql) {
                if (result[person].sql[sql].valid) {
                    tdPerson.style.backgroundColor = "green"
                }
            }
        }

        tableBody.appendChild(tr)

        tdPerson.addEventListener("click", () => {
            tdDropdown.classList.toggle("open")
        })
    }
}

function fetchAdmin() {
    return fetch(`${url}:${port}/admin`).then(response => response.json())
}

/*
    Example of a person:
        <tbody id="table-body">
            <tr>
                <td class="person">
                    <ul>
                        <li>Robin Trachsel</li>
                        <li>2</li>
                        <li>1</li>
                    </ul>
                </td>
                <td class="dropdown">
                    <ul>
                        <li>2024-09-25</li>
                        <li>12:00:00</li>
                        <li>SELECT * FROM users</li>
                    </ul>
                    <ul>
                        <li>2024-09-26</li>
                        <li>12:00:03</li>
                        <li>DROP TABLE IF ESISTS users</li>
                    </ul>
                </td>
            </tr>
        </tbody>

    Example fetchAdmin() response:
        [
            {
                "name": "Robin Trachsel",
                "requests": [
                    {},
                    {}
                ],
                "sql": [
                    {
                        "date": "2024-09-25",
                        "time": "12:00:00",
                        "query": "SELECT * FROM users",
                        "valid": true
                    }
                ]
            },
            {
                "name": "New User",
                "requests": [],
                "sql": []
            }
        ]
*/
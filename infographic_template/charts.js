var dataJSON = {};

fetch('./data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        dataJSON = data;

        // Pie Chart for Messages Sent by Person
        var messages = dataJSON.people.map(person => person.count);
        var person = dataJSON.people.map(person => person.name);

        var pieOptions = {
            series: messages,
            chart: {
                type: 'pie',
            },
            labels: person
        }

        var senderChart = new ApexCharts(document.getElementById('sender'), pieOptions);
        senderChart.render();

        // Heat Map for Messages Sent by Hour and Day
        const series = [];
        for (let day = 1; day <= 7; day++) {
            if (dataJSON.time[day]) {
                series.push({
                    name: getDayName(day),
                    data: Array.from({length: 24}, (_, hour) => ({
                        x: `${hour}:00`,
                        y: dataJSON.time[day][hour] || 0
                    }))
                });
            }
        }

        const heatMapOptions = {
            series: series,
            chart: {
                height: 350,
                type: 'heatmap',
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#008FFB"],
            title: {
                text: 'Berichten frequency'
            },
            xaxis: {
                type: 'category',
                tickAmount: 24,
                labels: {
                    formatter: (val) => val
                }
            }
        }

        const heatMapChart = new ApexCharts(document.getElementById('heatMap'), heatMapOptions);
        heatMapChart.render();

        // Display First Message by Person
        document.getElementById('firstMessageJoost').innerText = `Joost's first message: ${dataJSON.people[0].first_message.message}`;
        document.getElementById('firstMessageTim').innerText = `${dataJSON.people[1].name}'s first message: ${dataJSON.people[1].first_message.message}`;

        // Display total messages
        document.getElementById('totalMessages').innerText = `Total Messages: ${dataJSON.total_messages}`;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function getDayName(day) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[day - 1];
}
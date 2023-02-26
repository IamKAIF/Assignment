// Fetch the JSON data from the URL
fetch('https://www.jsonkeeper.com/b/P2VO')
  .then(response => response.json())
  .then(data => {
    // Filter the objects with the selected item_date
    const item_date = '2021-05-22'; // Change this to the desired item_date
    const filteredData = data.filter(item => item.item_date === item_date);
    
    // Aggregate the scheduling time of the filtered objects
    const scheduleCounts = {};
    filteredData.forEach(item => {
      const schedule_time = item.schedule_time;
      scheduleCounts[schedule_time] = scheduleCounts[schedule_time] ? scheduleCounts[schedule_time] + 1 : 1;
    });
    const aggregatedData = Object.entries(scheduleCounts).map(([schedule_time, count]) => ({ schedule_time, count }));
    
    // Use Chart.js to create a bar chart
    const chartData = {
      labels: aggregatedData.map(item => item.schedule_time),
      datasets: [
        {
          label: `Scheduling Time for ${item_date}`,
          data: aggregatedData.map(item => item.count),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
    const chartConfig = {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
    const myChart = new Chart(document.getElementById('myChart'), chartConfig);
  })
  .catch(error => console.error(error));

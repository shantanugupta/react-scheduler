
# Event generator for scheduler based applications

## Github Hosted URL: [https://react-scheduler](https://shantanugupta.github.io/react-scheduler/)

### Use cases
1. CRON job scheduling
2. Event management scheduling

</br>

Haivng an experience into database development using SQL Server, inspiration of building event generation applicaiton on ReactJS landed when I learned about [dbo.sysschedule](https://docs.microsoft.com/en-us/sql/relational-databases/system-tables/dbo-sysschedules-transact-sql?view=sql-server-ver15) table in SQL Server. Going through the design of sysschedule table, it was quite impressive how MS managed this entire table using just a flat table structure represented by JSON in our case.

</br>

This JSON structure cater all the different type of schedules that can be built using this application. Few modifications were done to enhance the functionality
```
{
  "name": "Christmas fest",
  "description": "Description goes here",
  "freq_type": 1,
  "freq_interval": 0,
  "freq_relative_interval": 0,
  "freq_recurrence_factor": 0,
  "active_start_date": "2021-12-17",
  "active_end_date": "2021-12-17",
  "active_start_time": "02:00",
  "active_end_time": "02:00",
  "freq_subday_type": 1,
  "freq_subday_interval": 0,
  "duration_subday_type": 1,
  "duration_interval": "",
  "occurance_choice_state": false
}
```
When the submit button is clicked, it generates all the events that this schedule is supposed to have.

![SQL Server job scheduler image not available](https://logicalread.com/wp-content/uploads/2016/03/Figure-4-LR-SQLAgent.png)


To setting up local machine with requirements - follow [requirements.txt](/requirements.txt)

Edit [package.json](package-lock.json)

```
"homepage": "http://<your-github-account>.github.io/<your-repo-name>"
```

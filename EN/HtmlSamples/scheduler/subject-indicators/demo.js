$(function () {
$.ig.loader({
            scriptPath: "http://staging.igniteui.local/17-1/IgniteUI/js/",
            cssPath: "http://staging.igniteui.local/17-1/IgniteUI/css/",
            resources: "igScheduler"
        });

        $.ig.loader(function () {
            var scheduleListDataSource = new $.ig.scheduler.ScheduleListDataSource(),
                appointmentsDS = new $.ig.DataSource({
                    primaryKey: "id",
                    dataSource: appointments
                });

            appointmentsDS.dataBind();

            scheduleListDataSource.resourceItemsSource(resources);
            scheduleListDataSource.appointmentItemsSource(appointmentsDS);

            $("#scheduler").igScheduler({
                height: "650px",
                width: "100%",
                selectedDate: today,
                dataSource: scheduleListDataSource
            });
        });
});
(function() {
    directoryApp
        .controller("directoryControl", function(directoryService) {
            var EmployeeApp = this;
            EmployeeApp.emp = {};
            EmployeeApp.emp.DOB = new Date();
            EmployeeApp.ListAllEmployees = ShowAll;
            EmployeeApp.AddEmployee = Add;
            EmployeeApp.UpdateEmployee = Update;
            EmployeeApp.DeleteEmployee = Delete;
            EmployeeApp.PopulateData = PopulateData;
            EmployeeApp.loading = false;
            EmployeeApp.empEdit=false;
            EmployeeApp.isUpdateVisible = false;

            EmployeeApp.ListAllEmployees();

            EmployeeApp.reset = function() {
                EmployeeApp.emp.Name = EmployeeApp.emp.Email = EmployeeApp.emp.DOB = EmployeeApp.emp.Age = EmployeeApp.emp.Gender = EmployeeApp.emp.Department = "";
                if (EmployeeApp.isUpdateVisible) {
            EmployeeApp.empEdit=false;                    
                    EmployeeApp.isUpdateVisible = false;
                }
            }
            EmployeeApp.calendar = function() {
                EmployeeApp.toggleCalendar = !EmployeeApp.toggleCalendar;
            }
            EmployeeApp.empDetails = [];
            EmployeeApp.calculateAge = function() {
                var secs, mins, hrs;
                secs = parseInt((new Date() - EmployeeApp.emp.DOB) / 1000);
                mins = parseInt(secs / 60);
                hrs = parseInt(mins / 60);
                EmployeeApp.emp.Age = parseInt(hrs / (24 * 360));
            }

            function ShowAll() {
                EmployeeApp.loading = true;
                directoryService.ShowAll().then(function(response) {
                        EmployeeApp.empDetails = response.data;
                        EmployeeApp.err = "";
                        EmployeeApp.loading = false;
                    },
                    function(err) {
                        EmployeeApp.loading = false;
                        EmployeeApp.err = err.data.message;
                    });
            }

            function Add(emp) {
                EmployeeApp.loading = true;
                directoryService.Add(emp).then(function(response) {
                    EmployeeApp.empDetails = response.data;
                    EmployeeApp.err = "";
                    EmployeeApp.isUpdateVisible = false;
                    EmployeeApp.loading = false;
                    EmployeeApp.reset();
                }, function(err) {
                    EmployeeApp.loading = false;
                    EmployeeApp.isUpdateVisible = false;
                    EmployeeApp.err = err.data.message;
                });
            }

            function Update(emp) {
                EmployeeApp.loading = true;
                directoryService.Update(emp).then(function(response) {
                    EmployeeApp.empDetails = response.data;
                    EmployeeApp.err = "";
                    EmployeeApp.loading = false;
                    EmployeeApp.isUpdateVisible = false;
                    EmployeeApp.reset();
                }, function(err) {
                    EmployeeApp.loading = false;
                    EmployeeApp.isUpdateVisible = false;
                    EmployeeApp.err = err.data.message;
                });
            }

            function Delete(emp) {
                console.log(emp.name)
                EmployeeApp.loading = true;
                directoryService.Delete({ "name": emp.name }).then(function(response) {
                    EmployeeApp.empDetails = response.data;
                    EmployeeApp.err = "";
                    EmployeeApp.loading = false;
                    EmployeeApp.reset();
                }, function(err) {
                    EmployeeApp.loading = false;
                    EmployeeApp.err = err.data.message;
                });
            }

            function PopulateData(emp) {
                EmployeeApp.isUpdateVisible = true;
                EmployeeApp.emp.Name = emp.name;
                EmployeeApp.emp.Email = emp.email;
                EmployeeApp.emp.DOB = new Date(emp.dob);
                EmployeeApp.emp.Age = parseInt(emp.age);
                EmployeeApp.emp.Gender = emp.gender;
                EmployeeApp.emp.Department = emp.department;
            }
        });
})();
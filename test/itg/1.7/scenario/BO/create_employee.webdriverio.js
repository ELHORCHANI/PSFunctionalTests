/**
 * Created by hibatallah.aouadni on 21/12/17.
 */
'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');


describe('The Employee Creation', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });

    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);

    describe('Log in in Back Office', function (done) {
        it('should log in successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signinBO()
                .waitForExist(this.selector.BO.EmployeePage.menu, 90000)
                .call(done);
        });
    });

    describe('Module "Welcome"', function (done) {
        it("should close the onboarding if displayed", function (done) {
            global.fctname = this.test.title;
            if (this.client.isVisible(this.selector.BO.Onboarding.popup)) {
                this.client
                    .click(this.selector.BO.Onboarding.popup_close_button)
                    .pause(1000)
                    .click(this.selector.BO.Onboarding.stop_button);
            };
            this.client.call(done);
        });
    });

    //need to create employee
    describe('Create new employee', function (done) {
        it("should go to Team", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.EmployeePage.menu, 90000)
                .moveToObject(this.selector.BO.EmployeePage.advanced_parameters, 90000)
                .waitForExist(this.selector.BO.EmployeePage.employees_subtab,90000)
                .click(this.selector.BO.EmployeePage.employees_subtab)
                .waitForExist(this.selector.BO.EmployeePage.new_employee_button, 90000)
                .call(done);
        });
        it("should click the button Create Employee", function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.EmployeePage.new_employee_button)
                .waitForExist(this.selector.BO.EmployeePage.form_employee, 90000)
                .call(done);
        });
        it('should fill the form of employee', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.EmployeePage.employee_name_input, 90000)
                .setValue(this.selector.BO.EmployeePage.employee_name_input, 'Demo')
                .waitForExist(this.selector.BO.EmployeePage.employee_lastname_input, 90000)
                .setValue(this.selector.BO.EmployeePage.employee_lastname_input, 'Prestashop')
                .waitForExist(this.selector.BO.EmployeePage.employee_email_input, 90000)
                .setValue(this.selector.BO.EmployeePage.employee_email_input, new_employee_email)
                .waitForExist(this.selector.BO.EmployeePage.employee_password_input, 90000)
                .setValue(this.selector.BO.EmployeePage.employee_password_input, '123456789')
                .waitForExist(this.selector.BO.EmployeePage.employee_page_input, 90000)
                .selectByValue(this.selector.BO.EmployeePage.employee_page_input,'4')
                .waitForExist(this.selector.BO.EmployeePage.employee_profile_input, 90000)
                .selectByValue(this.selector.BO.EmployeePage.employee_profile_input,'4')
                .pause(1000)
                .call(done);
        });
        it('should create the new employee', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.EmployeePage.employee_save_button, 90000)
                .click(this.selector.BO.EmployeePage.employee_save_button)
                .waitForExist(this.selector.BO.EmployeePage.employee_success, 90000)
                .pause(5000)
                .call(done);
        });
    });

    describe('Log out and Log in again', function (done) {
        it('should log out', function (done) {
            global.fctname = this.test.title;
            this.client
                .signoutBO2()
                .call(done);
        });

        it('should log in again', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://' + URL + '/admin-dev')
                .waitForExist(this.selector.BO.AccessPage.login_input, 90000)
                .setValue(this.selector.BO.AccessPage.login_input, new_employee_email)
                .setValue(this.selector.BO.AccessPage.password_input, '123456789')
                .click(this.selector.BO.AccessPage.login_button)
                .waitForExist(this.selector.BO.EmployeePage.menu, 90000)
                .pause(5000)
                .call(done);
        });
    });

    describe('Log out in Back Office', function (done) {
        it('should log out successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signoutBO2()
                .call(done);
        });
    });
});
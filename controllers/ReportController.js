require("dotenv").config()
const models = require("../models")
const transporter = require("../config/mailConfig")
const response = require("../helpers/response")
const fs = require("fs")
const mustache = require("mustache")
const createPdf = require("../helpers/createPdf")
const sequelize = require("sequelize")
const cron = require("node-cron")
const { start } = require("repl")

class Controller {
    static async emptyNotification(name, date) {
        const template = fs.readFileSync("./helpers/template.html", "utf-8")
        const { count, rows } = await models.User.findAndCountAll({ where: { role: "admin" } })
        for (let i = 0; i < count; i++) {
            const mailOptions = {
                from: process.env.GMAIL_USERNAME,
                to: rows[i].email,
                subject: `[Stock Notification] of ${name}`,
                html: mustache.render(template, { name: name, date: date } )
            }
            transporter.sendMail(mailOptions)
        }
    }

    static async monthlyNotification(req, res) {
        const month = new Date().getMonth() //7
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        // const { count: count_admin, rows:rows_admin } = await models.User.findAndCountAll({ where: { role: "admin" } })
        if (req.query.type == "in") {
            const name = "Product in Monthly Report";
            const { count, rows } = await models.Product_In.findAndCountAll( { 
                where: sequelize.where(sequelize.fn("month", sequelize.col("date")), month + 1),
                include: models.Product
            })
            createPdf({ count, rows, name: name , month: monthNames[month] })
        }
        if (req.query.type == "out") {
            const name = "Product out Monthly Report";
            const { count, rows } = await models.Product_Out.findAndCountAll( { 
                where: sequelize.where(sequelize.fn("month", sequelize.col("date")), month + 1),
                include: models.Product
            })
            // console.log(rows[0].Product["name"])
            createPdf({ count, rows, name: name, month: monthNames[month] })
        }
        if (req.query.type == "all") {
            const name = "All activity Monthly Report";
            const { count: count_in, rows: rows_in } = await models.Product_In.findAndCountAll( { 
                where: sequelize.where(sequelize.fn("month", sequelize.col("date")), month + 1),
                include: models.Product
            })
            const { count: count_out, rows: rows_out } = await models.Product_Out.findAndCountAll( { 
                where: sequelize.where(sequelize.fn("month", sequelize.col("date")), month + 1),
                include: models.Product
            })
            createPdf({ 
                count_in, 
                rows_in, 
                count_out, 
                rows_out, 
                name: name, 
                month: monthNames[month], type: "all" 
            })
            console.log(rows_out[0])
        }
        // console.log(rows[0].Product.name)
    }
}

module.exports = Controller;
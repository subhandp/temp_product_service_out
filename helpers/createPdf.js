const ejs = require("ejs")
const path = require("path")
const pdf = require("html-pdf")

module.exports = (data) => {
    ejs.renderFile(path.join(__dirname, "../helpers/report-template.ejs"), {
        data: data
    }, (err, res) => {
        if (!err) {
            const options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                     "height": "20mm",
                },
                "footer": {
                    "height": "20mm",
                },
            }
            pdf.create(res, options).toFile(path.join(__dirname, `../asset/pdf/${data.month.toLowerCase()}-${data.name.toLowerCase()}.pdf`), function(err, val) {
                if (!err) {
                    console.log(val.filename)
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log(err)
        }
    })

}
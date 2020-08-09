const Database = require('./database/db')
const { subjects, weekdays, getSubject, converteHoursToMinutes } = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html");
};

function pageSucess(req, res, urlString) {
    const url = urlString;
    return res.render("sucess.html", { url })

};

async function pageStudy(req, res) {
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time_from || !filters.time_to) {
        //se nao tiver filtros mostrar tudo
        const queryAll = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        `
        try {
            const db = await Database
            const proffys = await db.all(queryAll)
    
            proffys.map((prof) => {
                prof.subject = getSubject(prof.subject)
    
            })
    
            return res.render("study.html", { proffys, subjects, weekdays, filters })
    
        } catch (error) {
            console.log(error)
    
        }

        //return res.render("study.html", { subjects, weekdays, filters });
    }

    //converter horas em minutos
    const startTimetoMinutes = converteHoursToMinutes(filters.time_from)
    const endTimetoMinutes = converteHoursToMinutes(filters.time_to)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT classes_schedule.*
            FROM classes_schedule
            WHERE classes_schedule.class_id = classes.id
            AND classes_schedule.weekday = ${filters.weekday}
            AND classes_schedule.time_from >= ${startTimetoMinutes}
            AND classes_schedule.time_to <= ${endTimetoMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `
    //tratar erro na consulta do banco
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((prof) => {
            prof.subject = getSubject(prof.subject)

        })

        return res.render("study.html", { proffys, subjects, weekdays, filters })

    } catch (error) {
        console.log(error)

    }

    //return res.render("study.html", {proffys, subjects, weekdays, filters});
};
function pageGiveClasses(req, res) {

    return res.render("give-classes.html", { subjects, weekdays });
};

async function saveClasses(req, res) {
    const createProffys = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, i) => {
        return {
            weekday,
            time_from: converteHoursToMinutes(req.body.time_from[i]),
            time_to: converteHoursToMinutes(req.body.time_to[i])
        }
    })

    try {
        const db = await Database
        await createProffys(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time_from=" + req.body.time_from[0]
        queryString += "&time_to=" + req.body.time_to[0]

        return pageSucess(req, res, queryString)

        //return res.redirect('/study' + queryString)

    } catch (error) {
        console.log(error)
    }


}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageSucess
}
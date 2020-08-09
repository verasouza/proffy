const database = require('./db')
const createProffy = require('./createProffy');

database.then(async(db)=>{
    //inserir dados
    proffyValue = {
        name:"Mayk Brito",
        avatar:"https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "9887855454",
        bio:"Instrutor de Eduacação Física",
        
    }
    classValue = {
        subject: 4,
        cost: "20",
        
    }

    classScheduleValues = [
        {
        weekday: 0,
        time_from: 54000,
        time_to: 60000
        },
        {
            weekday: 2,
            time_from: 66000,
            time_to: 72000
            }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    const selectedProffys = await db.all("SELECT * FROM proffys")
    console.log(selectedProffys)

    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE proffys.id = 14
    `)
    console.log("PROFESSORES E SUAS MATERIAS")
    console.log(selectedClassesAndProffys)

    const selectedClassesSchedule = await db.all(`
        SELECT classes_schedule.*
        FROM classes_schedule
        WHERE classes_schedule.class_id = 14
         
    `)

    console.log(selectedClassesSchedule)

    const selectFilters = await db.all(`
        SELECT classes_schedule.*
        FROM classes_schedule
        WHERE classes_schedule.weekday = 1
        AND classes_schedule.time_from >= 48030
        AND classes_schedule.time_to <= 66030
    `)

    console.log('QUERY COM FILTROS')
    console.log(selectFilters)
})
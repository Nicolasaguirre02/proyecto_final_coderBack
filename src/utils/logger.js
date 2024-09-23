import winston from "winston";
import { config } from "../config/config.js";

const customLevelsOptions = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    },
    colors:{
        fatal:'red',
        error:'green',
        warning:'yellow',
        info:'blue',
        http:'white',
        debug:'white'
    }
}

const loggerProduccion = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({
            level:'info',
            
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        
        }),

        new winston.transports.File({filename:'./errors.log', level:'error'})

    ]
})

const loggerDesarrollo = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({
            level:'debug',
            
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        
        }),
    ]
})

export const addLoger = (req, res, next) => {
    //aca vy a crera una variable
    //Aca voy a preguntar si es productivo o de desarrollo
    let logger
    if(config.nodeEnv === "production" ){
        logger = loggerProduccion;
    }else{
        logger = loggerDesarrollo
    }

    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
}
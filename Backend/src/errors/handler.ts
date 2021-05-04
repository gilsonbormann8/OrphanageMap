import {ErrorRequestHandler} from 'express'
import {ValidationError } from 'yup';


const errorHandler: ErrorRequestHandler = (error, req, res, next ) => {
    if (error instanceof ValidationError) {
     console.error(error);
     return res.status(400).json({message: 'Preencha todos os campos corretamente'})
     
    }

    console.error(error);

    return res.status(500).json({ message: 'internal server error'});

};

export default errorHandler;
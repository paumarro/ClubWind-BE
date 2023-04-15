import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const handleValidationError = (req: Request, res: Response, nf: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    nf() 
};


export const validateMember = [

  body('first_name').isLength({ max: 100 }).isString().optional(),
    
  body('last_name').isLength({ max: 100 }).isString().optional(),

  body('address').isLength({ max: 400 }).isString().optional(), //update to fk

  body('date_of_entry').isDate().optional(),

  body('email').isEmail().normalizeEmail().optional(),

  body('gender').isLength({ max: 100 }).isString().optional(),

  body('phone').isMobilePhone('de-DE').optional(), //change to all region-codes

  body('birthday').isDate().optional(),

  body('role').isLength({ max: 100 }).isString().optional(),

  body('status').isLength({ max: 100 }).isString().optional(),

  body('groups_name').isLength({ max: 100 }).isString().optional()
]

export const validateClub = [

  body('name').isLength({ max: 100 }).isString().optional(),
    
  body('description').isLength({ max: 4000 }).isString().optional(),

]

export const validateEvent = [

  body('name').isLength({ max: 100 }).isString().optional(),
    
  body('description').isLength({ max: 10000 }).isString().optional(),

  body('is_public').isLength({ max: 400 }).isBoolean().optional(),

  body('date').isDate().optional(),

  body('start_at').isDate().optional(),

  body('ends_at').isDate().optional(),

  body('capacity').isDate().optional(),

  body('viewer_count').isLength({ max: 100 }).isString().optional(),

]



export const validateUserRegistration = [

  body('password').notEmpty().withMessage('Password is required.'),
  body('password').isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters long.'),
  body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,|`\]\[-]).{8,20}$/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'),
 
  body('username').notEmpty().withMessage('Email is required.'),
  body('username').isEmail().withMessage('Email is not valid.')
 ];
 
 
 export const validateUserLogin = [
 
  body('username').notEmpty().withMessage('Username is required.'),
  body('password').notEmpty().withMessage('Password is required.')
 ];
 
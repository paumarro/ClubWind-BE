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

  body('address').isLength({ max: 400 }).isString().optional(),

  body('date_of_entry').isDate().optional(),

  body('email').isEmail().normalizeEmail().optional(),

  body('gender').isLength({ max: 100 }).isString().optional(),

  body('phone').isMobilePhone('de-DE').optional(), //change to all region-codes

  body('birthday').isDate().optional(),

  body('role').isLength({ max: 100 }).isString().optional(),

  body('status').isLength({ max: 100 }).isString().optional(),

  body('groups_name').isLength({ max: 100 }).isString().optional()
]
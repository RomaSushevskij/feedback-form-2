import { object, SchemaOf, string } from 'yup';

import { FeedbackFormInitialValues } from 'components/feedbackForm/types';

enum validationPhrases {
  required = 'Поле обязательно для заполнения',
  minMaxName = 'Имя пользователя должно состоять из 6–30 знаков.',
  forbiddenSymbols = 'Запрещено использовать символы (`!@#$%^&*()_+\\-=[\\]{};\':"\\\\|,.<>/?~)',
}
const endPoints = {
  nameMin: 6,
  nameMax: 31,
};

const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

export const FeedbackFormSchema: SchemaOf<Omit<FeedbackFormInitialValues, 'rememberMe'>> =
  object().shape({
    name: string()
      .trim()
      .required(validationPhrases.required)
      .min(endPoints.nameMin, validationPhrases.minMaxName)
      .max(endPoints.nameMax, validationPhrases.minMaxName)
      // .matches(/(&=\+<>,_-'..')\w+/g, validationPhrases.forbiddenSymbols),
      .test(
        'checkOnForbiddenSymbols',
        validationPhrases.forbiddenSymbols,
        value => !specialChars.test(value as string),
      ),
    message: string().required(validationPhrases.required),
    phone: string().required(validationPhrases.required),
  });

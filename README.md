# Feedback form

Компонент формы обратной связи.

### Требования:
1. Форма может содержать следующие поля: "номер телефона", "имя" и "сообщение"
2. Шаблон заполнения поля "номер телефона" представляется как стандартная маска +7 (999) 999-99-99
3. Номер телефона проходит валидацию при отправки, и приводится к виду +79999999999  - подготовить данные к отправки ajax в формате json
4. Поля "Имя" и "Сообщение" проверяются на заполнение и валидируются на наличие спец. символов.
5. Предусмотреть вывод информации об:
   А. Отправка формы успешно/ошибка
   Б. Поле заполнено не верно
   В. Поле заполнено верно
6. Форма должна выводится на странице в виде модального кона, вызов по кнопке
7. Предусмотреть подстановку в форму заголовка  и текстового блока  из параметра data-формы

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
### Используемые технологии:
- HTML
- TypeScript
- React
- MUI
- Formik & Yup
- GH-pages

### Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Demo
:link: [Link to Demo App](https://romasushevskij.github.io/feedback-form-2/)



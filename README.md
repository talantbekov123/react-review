
# Ревью проектной работы

## Корректно ли написаны тесты для компонент? Корректно ли валидируются пропсы? (не применял на практике тестирование)
- Тесты есть только для app.jsx. Лучше покрыть тестами все компоненты.

## Корректно ли выполняется рендер компонент?
- В render функции не жедательно выполнять вычисления или логику.
      Желательно отдавать чистый jsx, лучше вынести условный оператор ниже выше в конмпоненту
- Для оптимизации рендера использовать хук useMemo. Подробнее по ссылке https://ru.reactjs.org/docs/hooks-reference.html#usememo
- Атрибут lang тега html имеет значение en. но при этом контент на русском

## Правильно ли настроены все роуты, в том числе и защищенные?
- Было бы здорово создать папку pages для каждой страницы в приложении, например поместить туда компоненту Profile, Login, NotFound. Таким образом отделять страницы от компонентов. В папке components желательно содержать переисполняемые компоненты, которые будут использоваться по всему приложению(например кнопки или определённые элементы интерфейса).
Для роутов создать отдельный файл в котором будет компонент который возвразщает все роуты.

```
if (isAuthenticated) {
     return (<Switch>
            <Route path="/private-routes" component={privatePage}>
        </Swich>)
} 
return (<Switch>
            <Route path="/public-routes" component={publicPage}>
        </Swich>)

```

## Оптимально ли написаны компоненты? Правильно ли выделены функциональные компоненты?
- Желательно использовать функциональные компоненты вместо классовых. Это поможет сократить количество кода без потери качества. 
- Используются классовые компоненты без жизненных циклов. Преимущество классовых компонентов не были использованы в полной мере. Лучше описать компоненты как функциональные компоненты. Использовать хуки как useEffect и useState.
- Все контейнеры удалить использовать хук из react-redux useSelector, useDispatch. Используя данные хуки отпадает необходимость оборачивать компоненты в контейнеры.
- В будущем если проект будет больше, то лучше сгруппировать провайдеры в отдельный компонент RootProvider описанный отдельном файле. А само приложение с роутами передать через props.children.
Далее провайдер передать в index.js метод ReactDOM.render(RootProvider, document.getElementById('root')).
Пример провайдера ниже.

В вашем проекте это не критично, так как используется только 1 провайдер,

provider.js
```
export function RootProvider(props) {
    <ReduxProvider>
        <Router>
            {props.children}
        </Router>
    </ReduxProvide>
}
```

## Корректно ли описаны `Actions`, `Reducers`?
- Логику логина лучше расписать в трех отдельных ActionCreators, например
```
loginRequest()
loginSuccess()
loginError()
```
- В SessionActions.js для dispatch в thunk лучше создать отдельный actionCreators. Подробнее описал в самос файле SessionActions.js

## Можно ли упростить инфраструктуру проекта? Как бы вы посоветовали ее реорганизовать?
- В package.json некоторые зависимости нужно вынести в devDependencies. Например
```
"@babel/core": "7.8.7",
"@babel/preset-env": "7.8.7",
"@babel/preset-react": "7.8.3",
"babel-jest": "25.1.0",
"babel-loader": "8.0.6",
"enzyme": "3.11.0",
"enzyme-adapter-react-16": "1.15.2",
"eslint": "6.8.0",
"eslint-plugin-react": "^7.19.0",
"jest": "25.1.0"
```
- В файле webpack.config.js порт читать через перемененные окружения и желательно задать порт по умолчанию.
Например вот так `const { PORT = '3000' } = process.env;`
- Желательно вынести логику redux в отдельную директория, например /state где будут храниться Actions, Reducers
и настройка для Store. Финальная структура папок должна выглядеть примерно так
```
/state
    /actions
    /reducers
    store.js
/containers (но лучше избавиться от них, использую react-redux хуки, подробнее в комментариях ниже)
/components
/helpers
```
- Есть проблемы со стилистикой кода
1) В некоторых местах используются кавычки одинарные или двойные, лучше использовать только одинарные или только двойные.
2) Разных местах по разному, есть или нет точки с запятой в конце строки. Лучше придерживаться единого стиля
3) Нейминг файлов, например SessionActions.js через camelCase в остальных случаях через дефиз
- Есть ошибки линтинга, при запуске `npm run eslint` линтер ругается
- Экшн типы вынести в один обьект что бы сгруппировать их вместе и обращаться к ним через поля обьекта.
- Дублируются название файлов с названием папок, можно переименовать
  файлы во всех компонентах на index.js и при импорте указать только название папки.
  Это считается хорошим тоном. Это позволит делать импорт как в примере ниже. 
  import LinkButton from '../link-button'
- Не настоенна конфигурация husky хотя вы установили husky в package.json внутри дев зависимостей.



# Реализовано простое приложение, без подключения к БД.

## Задание:
Роуты:
+ `/` - главная
+ `/login` - страница ввода логина и пароля
+ `/profile` - страница с произвольным текстом, недоступная без авторизации
+ `/kvazavr` - 404

В шапке есть ссылки:

+ На главную (`/`)
+ Профиль (`/profile`)
+ Логин (`/login`)
+ 404 (`/kvazavr`)

Если url битый - редирект на `/kvazavr`

Если пользователь не авторизован -- перекидывает на страницу `/login`.
Моковые данные для входа: user: student, password: student

Если данные инвалидны, то:
Имя пользователя или пароль некорректны

Если данные валидны: редирект на `/profile`


# Buoi 4 - JWT, API Gateway va phan quyen xuyen service

## 1. Cau truc va cong

- `api-gateway`: `8080`
- `auth-service`: `8081`, DB `auth_db`
- `course-service`: `8082`, DB `course_db`
- `registration-service`: `8083`, DB `registration_db`

`course-service` va `registration-service` tu verify JWT bang cung `jwt.secret` voi `auth-service`.

## 2. Cau hinh MySQL

Chay `LAB4_SETUP.sql` trong MySQL Workbench neu chua co 3 database.

Mat khau MySQL cua may nay nam trong `application-local.properties` cua 3 service co database. File nay da duoc `.gitignore` de tranh day mat khau len GitHub.

Neu mo project tren may khac, sua 3 file:

- `auth-service/src/main/resources/application-local.properties`
- `course-service/src/main/resources/application-local.properties`
- `registration-service/src/main/resources/application-local.properties`

Hoac dat bien moi truong `DB_PASSWORD`.

## 3. Thu tu chay

1. MySQL Server
2. `CourseServiceApplication` - 8082
3. `RegistrationServiceApplication` - 8083
4. `AuthServiceApplication` - 8081
5. `ApiGatewayApplication` - 8080

Tu Buoi 4, test nghiep vu qua Gateway `http://localhost:8080`.

## 4. Tai khoan mau

- ADMIN: `admin` / `admin123`
- STUDENT: `student1` / `student123`

## 5. 8 case Postman

### Case 1 - Login ADMIN

`POST http://localhost:8080/api/auth/login`

```json
{"username":"admin","password":"admin123"}
```

Ky vong: `200`, co `token`, `username=admin`, `role=ADMIN`.

Login them `student1/student123` va luu token STUDENT.

### Case 2 - GET courses public

`GET http://localhost:8080/api/courses`

Khong can token. Ky vong: `200`.

### Case 3 - POST course thieu Authorization

`POST http://localhost:8080/api/courses`

```json
{"tenMonHoc":"Kien truc phan mem","soTinChi":3,"soChoToiDa":30}
```

Ky vong: `401` tai Gateway.

### Case 4 - POST course bang token STUDENT

Header: `Authorization: Bearer <STUDENT_TOKEN>`

Ky vong: `403` tai `course-service` vi khong co ROLE_ADMIN.

### Case 5 - POST course bang token ADMIN

Header: `Authorization: Bearer <ADMIN_TOKEN>`

```json
{"tenMonHoc":"Kien truc phan mem","soTinChi":3,"soChoToiDa":30}
```

Ky vong: `201`.

### Case 6 - Dang ky mon bang STUDENT

`POST http://localhost:8080/api/registrations`

Header: `Authorization: Bearer <STUDENT_TOKEN>`

```json
{"studentId":1,"courseId":1}
```

Ky vong: `201` neu `courseId=1` ton tai va con cho. Neu ID mon vua tao khac 1, dung ID that trong response Case 5.

### Case 7 - Partner API key dung

`GET http://localhost:8080/api/public/courses`

Header: `X-API-KEY: crs-partner-key-2026`

Ky vong: `200`.

### Case 8 - Partner API key sai/thieu

`GET http://localhost:8080/api/public/courses`

Khong gui `X-API-KEY` hoac gui sai. Ky vong: `403`.

## 6. Git commit theo de

Sau khi test 8 case thanh cong, co the commit theo 3 nhom:

```bash
git add auth-service/
git commit -m "init: auth-service with JWT login + seed data"

git add api-gateway/
git commit -m "init: api-gateway routing + auth header filter + api key filter"

git add course-service/ registration-service/ .gitignore LAB4_README.md LAB4_SETUP.sql
git commit -m "feat: jwt verification + role-based authorization across services"

git push
```

Khong `git add -f` cac file `application-local.properties` vi chung chua mat khau MySQL cuc bo.

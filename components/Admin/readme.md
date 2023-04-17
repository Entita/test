# Admin GUI

## Admin's Dashboard

![image](https://user-images.githubusercontent.com/47132583/202997237-79dac485-59f5-4219-85af-0a244564cf57.png)

## Logout

![image](https://user-images.githubusercontent.com/47132583/202997319-27dff1e2-6470-4d13-a307-16c7ebd68d88.png)

## Post Page

![image](https://user-images.githubusercontent.com/47132583/202997368-28b2869d-5981-45a1-bec4-f7bcbf4429f6.png)

## First Form Idea

![image](https://user-images.githubusercontent.com/47132583/203821567-e1dbe971-1069-4b11-b488-401aba792997.png)

https://user-images.githubusercontent.com/47132583/203822051-a86c53e5-912c-4fbf-a4c6-ad64058bd530.mp4

## Form That is Used in Project

https://user-images.githubusercontent.com/47132583/204303468-ec5c8217-9c68-4f36-ba0b-d7696331d40a.mp4

## Inserted Student

![image](https://user-images.githubusercontent.com/47132583/204356076-3732e1e4-791e-4db3-a963-2a7119fcf027.png)

## MongoDB Atlas

    LECTURE 
    {
        "_id":{"$oid":"638501fa2ab29a2e99bc3d0a"},
        "status":"waiting",
        "from":"2022-11-29T13:00:00.000Z",
        "to":"2022-11-29T14:00:00.000Z",
        "studentId":"638501fa2ab29a2e99bc3d08",
        "createdAt":{"$date":{"$numberLong":"1669661178561"}},
        "updatedAt":{"$date":{"$numberLong":"1669661178561"}},
        "__v":{"$numberInt":"0"}
    }
    
    REPRESENTATIVE
    {
        "_id":{"$oid":"638501fa2ab29a2e99bc3d06"},
        "role":"representative",
        "name":"Radmila",
        "surname":"Hajná",
        "phone":"604929978",
        "password":"o7iOvOQ0xX",
        "students":[],
        "lectures":[],
        "legalRepresentative":"",
        "child":"638501fa2ab29a2e99bc3d08",
        "homework":[],
        "plan":[],
        "createdAt":{"$date":{"$numberLong":"1669661178418"}},
        "updatedAt":{"$date":{"$numberLong":"1669661178560"}},
        "__v":{"$numberInt":"0"}
    }
    
    STUDENT
    {
        "_id":{"$oid":"638501fa2ab29a2e99bc3d08"},
        "role":"student",
        "name":"Michael",
        "surname":"Hajný",
        "username":"michaj",
        "phone":"",
        "password":"xA65bj8t6p",
        "students":[],
        "lectures":["638501fa2ab29a2e99bc3d0a"],
        "legalRepresentative":"638501fa2ab29a2e99bc3d06",
        "child":"",
        "homework":[],
        "plan":["přítomný čas prostý, přítomný čas průběhový, minulý čas prostý, minulý čas průběhový"],
        "createdAt":{"$date":{"$numberLong":"1669661178521"}},
        "updatedAt":{"$date":{"$numberLong":"1669661178918"}},
        "__v":{"$numberInt":"0"}
    }

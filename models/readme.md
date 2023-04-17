**KOLEKCE**

V databázi se nachází 6 kolekcí, kde některé z nich jsou propojené. 

> users
> 
> lectures
> 
> homeworks
> 
> apologies
> 
> payments
> 
> paymentRequests
_Pokusím se je postupně projít, říct k čemu slouží a jak jsou propojené._

Notace:

    pole = []
    objekt = {}
    číslo = int
    řetězec = str
    pravdivostni hodnota = bool
    odkaz na objekt ve string formě = str -> {} (příklad "63f0c3f9fa7ab09efe5fd64f")

**KOLEKCE - USER**

    {
        "_id": {"$oid":"63f0c3f9fa7ab09efe5fd64f"},
        "role": "admin/representative/student",
        "name": str,
        "surname": str,
        "username": str,
        "phone": str, // když má student zákonného zástupce, tak je v této kolekci i telefonní číslo
        "password": str,
        "students": [str -> {}],
        "disabled": bool, // když nechceme studenta nadále zobrazovat u admina, ale chceme zachovat data o studentovi v databázi
        "lectures": [str -> {}], // id odkaz na záznam v kolekci lectures
        "legalRepresentative": str -> {}, // id zákonného zástupce dítěte
        "child": [str -> {}], // pole id odkazů na děti v kolekci users daného zákonného zástupce
        "homeworks": [str -> {}], // pole id odkazu na záznamy o domácích úkolek v kolekci homeworks
        "plan": [str],
        "wordList": str,
        "files": [str],
        "createdAt": {"$date":{"$numberLong":"1676723193914"}},
        "updatedAt": {"$date":{"$numberLong":"1678451411735"}},
        "__v": {"$numberInt":"0"}
    }
    
**KOLEKCE - HOMEWORKS**

    {
        "_id": {"$oid":"641d9405e66dffede1f48aa6"},
        "title": str,
        "description": str,
        "createdAt": {"$date":{"$numberLong":"1679660037479"}},
        "updatedAt": {"$date":{"$numberLong":"1679660037479"}},
        "__v": {"$numberInt":"0"}
    }

**KOLEKCE - APOLOGIES**

    {
        "_id":{"$oid":"642bddd284a1ed3f5057926f"},
        "studentId": str -> {},
        "lessonId": str -> {},
        "from": date,
        "createdAt": {"$date":{"$numberLong":"1680596434094"}},
        "updatedAt": {"$date":{"$numberLong":"1680596434094"}},
        "__v": {"$numberInt":"0"}
    }
    
**KOLEKCE - LECTURES**

    {
        "_id":{"$oid":"63f0ce64a1352bd1f89fdf72"},
        "from": date,
        "to": date,
        "studentId": str -> {},
        "statuses":
            [ 
                {
                    "from": date,
                    "to": date,
                    "status": str,
                    "_id": str -> {}
                }   
            ],
        "changes":
             [ 
                {
                    "from": date,
                    "to": date,
                    "newFrom": date,
                    "newTo": date,
                    "_id": str -> {}
                }   
            ],
        "createdAt": {"$date":{"$numberLong":"1676725860748"}},
        "updatedAt": {"$date":{"$numberLong":"1676725860748"}},
        "__v": {"$numberInt":"0"}
    }
    
**KOLEKCE - PAYMENTS**

    {
        "_id":{"$oid":"642eb130e0d03d8d458c357e"},
        "studentId": str -> {},
        "lessonId": str -> {},
        "from": date,
        "amount": int,
        "createdAt": {"$date":{"$numberLong":"1680781616721"}},
        "updatedAt": {"$date":{"$numberLong":"1680781616721"}},
        "__v": {"$numberInt":"0"}
    }
    
**KOLEKCE - PAYMENTREQUESTS**

    {
        "_id": {"$oid":"642eb1d7e0d03d8d458c36d0"},
        "studentId": str -> {},
        "lessonId": str -> {},
        "from": date,
        "amount": int,
        "createdAt": {"$date":{"$numberLong":"1680781783754"}},
        "updatedAt": {"$date":{"$numberLong":"1680781783754"}},
        "__v": {"$numberInt":"0"}
    }

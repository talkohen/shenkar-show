Shenkar show API

to log in to the system ,
POST userName and password to: 

https://shenkar-show.herokuapp.com/users/auth

logout:
https://shenkar-show.herokuapp.com/logout


Admin- 
//institutes
http://shenkar-show.herokuapp.com/admin/createInstitute {name : text , aboutText : text, logoUrl: file , aboutimageUrl : file, mainTextColor: text, lineColor: text, secondaryColor: text, primaryColor: text, building: number, path:text, location:number}
http://shenkar-show.herokuapp.com/admin/updateInstitute {id: number , name : text , aboutText : text, logoUrl: file , logoKey: text (current imageUrl), aboutimageUrl : file, imageKey: text (current imageUrl), mainTextColor: text, lineColor: text, secondaryColor: text, primaryColor: text, building: number, path:text, location:number}
http://shenkar-show.herokuapp.com/admin/deleteInstitute {id: number}

//users
http://shenkar-show.herokuapp.com/admin/createUser {userName: text , role: "institute manager", name: text, password: text, email: text, institute: number}
http://shenkar-show.herokuapp.com/admin/updateUser {userName: text , role: "institute manager", name: text, password: text, email: text, institute: number}
http://shenkar-show.herokuapp.com/admin/deleteUser {id: number, institute: number}


Institute manager - 

//departments
https://shenkar-show.herokuapp.com/institute/createDepartment {institute: number, name: text, locationDescription: text, imageUrl: file, largeImageUrl: file, building: number, path:text, location:number}
https://shenkar-show.herokuapp.com/institute/updateDepartment {id: number, institute: number, name: text, locationDescription: text, imageUrl: file, logoKey:text (current imageUrl), largeImageUrl: file, imageKey:text (current imageUrl), building: number, path:text, location:number}
https://shenkar-show.herokuapp.com/institute/deleteDepartment {id: number, institute: number }
https://shenkar-show.herokuapp.com/institute/departments

//users
https://shenkar-show.herokuapp.com/institute/users
https://shenkar-show.herokuapp.com/institute/createUser {userName: text , role: "department manager", name: text, password: text, email: text, institute: number, department: number}
https://shenkar-show.herokuapp.com/institute/updateUser {userName: text , role: "department manager", name: text, password: text, email: text, institute: number}
https://shenkar-show.herokuapp.com/institute/deleteUser {id: number, institute: number}

//locations
https://shenkar-show.herokuapp.com/institute/locations
http://shenkar-show.herokuapp.com/institute/createLocation {institute: number , lat: number, lng: number , url: text, description: text}
http://shenkar-show.herokuapp.com/institute/updateLocation {id:number , institute: number , lat: number, lng: number , url: text, description: text}
http://shenkar-show.herokuapp.com/institute/deleteLocation {id: number, institute: number}


//routes
https://shenkar-show.herokuapp.com/institute/routes
http://shenkar-show.herokuapp.com/institute/createRoute {institute: number , name: text, projectIds: [number]}
http://shenkar-show.herokuapp.com/institute/updateRoute {id: number, institute: number , name: text, projectIds: [number]}
http://shenkar-show.herokuapp.com/institute/deleteRoute {id: number, institute: number}



Department manager - 

//projects
https://shenkar-show.herokuapp.com/department/projects
https://shenkar-show.herokuapp.com/department/createProject {institute: number, departmentId : number , name: text, description: text, location: number, imageUrl1:file,  imageUrl2:file,  imageUrl3:file,  imageUrl4:file,  imageUrl5:file, soundUrl:file, videoUrl: text}
https://shenkar-show.herokuapp.com/department/updateProject {id: number , institute: number, departmentId : number , name: text, description: text, location: number, imageUrl1:file,  imageUrl2:file,  imageUrl3:file,  imageUrl4:file,  imageUrl5:file, imageKey1: text (current imageUrl), imageKey2: text (current imageUrl), imageKey3: text (current imageUrl), imageKey4: text (current imageUrl), imageKey5: text (current imageUrl),   soundUrl:file, soundKey:text (current soundUrl),  videoUrl: text}
https://shenkar-show.herokuapp.com/department/deleteProject {id: number, department: number, institute: number}

//users
https://shenkar-show.herokuapp.com/department/users 
https://shenkar-show.herokuapp.com/department/createUser {userName: text , role: "student", name: text, password: text, email: text, institute: number, department: number , project: number}
https://shenkar-show.herokuapp.com/department/updateUser {id: number, userName: text , role: "student", name: text, password: text, email: text, institute: number, department: number, project: number}
https://shenkar-show.herokuapp.com/department/deleteUser {id: number, department: number, institute: number, project: number}



Student - 

https://shenkar-show.herokuapp.com/student/project
https://shenkar-show.herokuapp.com/student/updateProject {id: number , institute: number, departmentId : number , name: text, description: text, location: number, imageUrl1:file,  imageUrl2:file,  imageUrl3:file,  imageUrl4:file,  imageUrl5:file, imageKey1: text (current imageUrl), imageKey2: text (current imageUrl), imageKey3: text (current imageUrl), imageKey4: text (current imageUrl), imageKey5: text (current imageUrl),   soundUrl:file, soundKey:text (current soundUrl), videoUrl: text}

export class USER{
    id;
    username;
    email;
    status;
    role;
    type;
    groups;
    company_id;
    company_name;
    startPage;
    company_owner;
    constructor() {
    }

     
    get id(){return this.id}
    get username(){return this.username}
    get email(){return this.email}
    get status(){return this.status}
    get role(){return this.role}
    get type(){return this.type}
    get groups(){return this.groups}
    get company_id(){return this.company_id}
    get company_name(){return this.company_name}
    get startPage(){return this.startPage}
    get companyOwner(){return this.company_owner}

    set id(id){this.id = id}
    set username(username){this.username = username}
    set email(email){this.email = email}
    set status(status){this.status = status}
    set role(role){this.role = role}
    set type(type){this.type = type}
    set groups(groups){this.groups = groups}
    set company_id(company_id){this.company_id = company_id}
    set company_name(company_name){this.company_name = company_name}
    set startPage(startPage){this.startPage = startPage}
    set companyOwner(company_owner){this.company_owner = company_owner}
}
import dotenv from 'dotenv'
dotenv.config()
import { Configuration, OpenAIApi } from "openai";
import fetch from 'node-fetch';
import { USER } from './model/User.js';
import moment from 'moment';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


let PROJECT_NAME = "Drupal/PHP";
let PROJECT_TIME  ="";
let PROJECT_DESCRIPTION = "";
async function generateText() {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Write short generic message about project ${PROJECT_NAME} task. Write short overview about ${PROJECT_DESCRIPTION}, no longer then 20 word and dont mention project name! if its not finished explain why` }],
    });
    // console.log(completion.data.choices[0].message.content)
    return completion.data.choices[0].message.content;
}

async function getMyUserInfo() {
    const resp = await httpClient("https://api.everhour.com/users/me");
    // console.log(resp);
    const user = createUser(resp);
    getTaskByProjectName(user)
}


async function getTaskByProjectName(user) {
    const resp = await httpClient(`https://api.everhour.com/tasks/search?query=${PROJECT_NAME}&limit=10&searchInClosed=false`);
    const resp2 = await httpClient(`https://api.everhour.com/users/${user.id}/time?`);
    updateTask(resp[0].id, user)
}

async function updateTask(projectId, user) {
    const resp = await httpClient(`https://api.everhour.com/tasks/${projectId}/time`);
    // console.log(resp);
    var date = new Date();
    var formattedDate = moment(date).format('YYYY-MM-DD');
    const body = JSON.stringify({time: PROJECT_TIME * 3600, date: formattedDate, user: user.id, comment: await generateText()})
    const post = await httpClient(`https://api.everhour.com/tasks/${projectId}/time`, "PUT", body);
    // console.log(post)
}

async function httpClient(url, method = "GET", body = null){
    const response = await fetch(url, {
        method: method,
        body: body,
        headers: { 'Content-Type': 'application/json', 'X-Api-Key': process.env.EVERHOUER_API_KEY }
    });
    const data = await response.json();
    return data;
}

function createUser(resp){
    const user = new USER();
    user.id = resp.id;
    user.username = resp.name;
    user.email = resp.email;
    user.company_id = resp.team.id;
    user.company_name = resp.team.name;
    user.companyOwner = resp.team.owner;
    user.groups = resp.groups;
    user.role = resp.role;
    user.startPage = resp.startPage;
    user.status = resp.status;
    user.type = resp.type;
    return user;
}

'https://api.everhour.com/projects'


PROJECT_NAME = process.argv[2];
PROJECT_TIME = process.argv[3];
PROJECT_DESCRIPTION = process.argv[4];
getMyUserInfo();

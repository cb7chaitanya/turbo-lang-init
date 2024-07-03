#!/usr/bin/env node 
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs"
import fsExtra from "fs-extra";
import path from "path"
import { fileURLToPath } from 'url';
import { execSync } from "child_process";

const program = new Command();

const templates: { [key: string]: string } = {
    'javascript': 'js-template',
    'typescript': 'ts-template',
    'rust': 'rs-template',
    'solidity': 'sol-template',
    'Next': 'next-template',
    'React': 'react-template',
    'Next+Typescript': 'next-ts-template',
    'React+Typescript': 'react-ts-template',
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createProject = (language: string, directory: string) => {
    const templateDir = path.resolve(__dirname, '..', 'src', 'templates', templates[language]);
    const projectDir = path.join(process.cwd(), 'apps', directory);

    if(fs.existsSync(projectDir)) {
        console.log('Project already exists');
        process.exit(1);
    }
    try{
        fs.mkdirSync(projectDir, { recursive: true });
        fsExtra.copySync(templateDir, projectDir);
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if(!packageJson.scripts[directory]){
            packageJson.scripts[directory] = `cd apps/${directory} && npm run dev`;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));          
        }
        else{
            console.log(`Script for ${directory} already exists`);
        }
        console.log(`Creating project in ${projectDir}`);
        console.log(`Installing dependencies...`);
        execSync(`cd ${projectDir} && npm install`, { stdio: 'inherit' });
        console.log(`Project setup complete!`);
    } catch(err) {
        console.error(`Error creating project directory: ${err}`);
        process.exit(1);
    }
}

program
    .version('0.0.1')
    .description('CLI tool to initialize multi-language projects in a Turborepo environment')

program
    .command('init')
    .description('Initialize a new project')
    .action(async () => {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'language',
                message: 'Select your project language/framework',
                choices: Object.keys(templates)
            },
            {
                type: 'input',
                name: 'projectName',
                message: 'Enter your project name',
                validate: (input: string) => input.length > 0,
                default: 'my-project'
            }
    ])
    console.log(__dirname);
    createProject(answers.language, answers.projectName)
})

program.parse(process.argv);

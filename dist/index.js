#!/usr/bin/env node 
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
const program = new Command();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const templates = {
    'javascript': 'js-template',
    'typescript': 'ts-template',
    'rust': 'rs-template',
    'solidity': 'sol-template'
};
const createProject = (language, directory) => {
    const templateDir = path.join(__dirname, 'templates', templates[language]);
    const projectDir = path.join(process.cwd(), 'apps', directory);
    if (fs.existsSync(projectDir)) {
        console.log('Project already exists');
        process.exit(1);
    }
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.scripts[directory] = `cd apps/${directory} && npm run dev`;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`Creating project in ${projectDir}`);
    console.log(`Installing dependencies...`);
    execSync(`cd ${projectDir} && npm install`, { stdio: 'inherit' });
    console.log(`Project setup complete!`);
};
program
    .version('0.0.1')
    .description('CLI tool to initialize multi-language projects in a Turborepo environment');
program
    .command('init')
    .description('Initialize a new project')
    .action(async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'language',
            message: 'Select your project language',
            choices: ['javascript', 'typescript', 'rust', 'solidity']
        },
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter your project name',
            validate: (input) => input.length > 0,
            default: 'my-project'
        }
    ]);
    createProject(answers.language, answers.projectName);
});
program.parse(process.argv);

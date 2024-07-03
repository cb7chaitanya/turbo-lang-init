# Turbo Lang Init

Turbo Lang Init is a CLI tool to initialize multi-/multi-framework projects in a Turborepo environment. It supports JavaScript, TypeScript, Rust, Solidity, Next.js, React, and their TypeScript variants.


## Features
* Initialize projects with templates for multiple languages and frameworks.
* Automatically install dependencies.
* Automatically add npm scripts for project management.

### Installation

#### Package on npm registry: https://www.npmjs.com/package/turbo-lang-init

### To install Turbo Lang Init, run:

    npm install turbo-lang-init
    
### To create a new project, run the following command in your terminal:

    npx tli init

You will be prompted to select the language/framework and to provide a project name. The CLI tool will then create a new project directory under apps/ and set up the project using the appropriate template.

### Supported Languages/Frameworks
* JavaScript
* TypeScript
* Rust
* Solidity
* Next.js
* React
* Next.js with TypeScript
* React with TypeScript

### Examples
#### Initialize a TypeScript project:

    npx tli init

* Select typescript from the list of available templates and provide a project name, e.g., my-ts-project.

#### Initialize a React project with TypeScript:


    npx tli init

* Select React+Typescript from the list of available templates and provide a project name, e.g., my-react-ts-project.

### Project Structure

When you initialize a project, it will be created under the apps/ directory. For example, if you create a project named my-project, the directory structure will look like this:


    your-turborepo/
    ├── apps/
    │   └── my-project/
    │       ├── ...
    ├── package.json
    └── ...

### Contributing

Contributions are welcome! If you have suggestions for improvements, feel free to open an issue or submit a pull request.
#### Repository: https://github.com/cb7chaitanya/turbo-lang-init

* Fork the repository.
* Create a new branch: git checkout -b feature/my-feature.
* Make your changes and commit them: git commit -m 'Add some feature'.
* Push to the branch: git push origin feature/my-feature.
* Open a pull request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgements
Thanks to all the contributors who have helped in the development of this project.

### Contact
For any questions or feedback, feel free to reach out on cb7chaitanya@gmail.com

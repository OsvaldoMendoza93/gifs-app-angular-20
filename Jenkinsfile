pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                sh 'ls -la'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Build Angular'){
            step{
                sh 'npm run build'
                sh 'ls -la dist'
            }
        }
    }

}
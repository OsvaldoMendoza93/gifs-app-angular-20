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

    }

}
pipeline {

    agent any

    options {
        skipDefaultCheckout(true)
    }

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
    post {

        success {

            echo 'Todo salió bien'

        }

    }

}
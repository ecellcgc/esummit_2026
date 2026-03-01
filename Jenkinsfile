pipeline {
    agent any

    stages {
        stage('Pull latest changes') {
            steps {
                git branch: 'main', credentialsId: 'f2227dff-702d-4689-96f5-901e14fb3493', url: 'git@github.com:ecellcgc/esummit_2026.git'
            }
        }
        stage("Set env variables") {
            steps {
                sh 'echo "VITE_API_BASE_URL=https://api.ecellcgc.in" >> .env'
            }
        }
        stage('Build') {
            steps {
                sh 'docker compose up --build --force-recreate -d'
            }
        }
    }
}

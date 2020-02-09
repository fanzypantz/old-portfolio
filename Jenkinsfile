pipeline {
  agent any
  stages {
    stage('Init') {
      steps {
        sh '''yarn install
cd ./backendServer
yarn install
yarn build'''
      }
    }

  }
}
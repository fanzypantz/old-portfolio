pipeline {
  agent any
  stages {
    stage('Init') {
      steps {
        sh '''yarn install
yarn build
cd ./backendServer
yarn install
NODE_ENV=production yarn build'''
      }
    }

  }
}
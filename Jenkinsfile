pipeline {
  agent any
  stages {
    stage('Init') {
      steps {
        sh '''yarn install
yarn build
cd ./backendServer
yarn install'''
      }
    }

    stage('Copy Build') {
      steps {
        sh '''cd ..
sudo rm -rf /var/www/node/personal/portfolio/*
sudo cp -a personalPortfolio_master/. /var/www/node/personal/portfolio'''
      }
    }

    stage('Run') {
      steps {
        sh '''pm2 reload portfolioNuxt
pm2 reload portfolioStrapi'''
      }
    }

  }
}
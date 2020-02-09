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
sudo rm -rf /var/www/node/personal/portfolio
sudo mkdir /var/www/node/personal/portfolio
sudo cp -a personalPortfolio_master/. /var/www/node/personal/portfolio'''
      }
    }

  }
}
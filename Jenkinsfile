pipeline {
    agent none
    stages {
        stage('deploy frontend') {
            agent {
                 label '8.154'
            }
            when {
                  beforeAgent true
                  branch 'develop'
            }
            steps {
                withEnv(['JENKINS_NODE_COOKIE=dontkillme']) {
                    sh '''
                        npm i --registry https://registry.npm.taobao.org
                        export OUTPUT_DIR=/data/unicom_multi_site_server/unicom_cloud_frontend
                        npm run build
                    '''
                }
            }
        }
    }
}
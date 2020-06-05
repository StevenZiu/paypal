pipeline{
    agent any
    environment {
      API_ENDPOINT = credentials('API_ENDPOINT')
    }
    stages {
        stage("Build"){
            steps{
                sh "npm install"
                sh "npm run build"
            }
            post{
                always{
                    echo "post build"
                }
                success{
                    echo "========A build stage successfully========"
                }
                failure{
                    echo "========A build stage failed========"
                }
            }
        }
        stage("Test") {
          steps {
            echo "test state started"
          }
        }
        stage("Deploy") {
          steps {
            echo "deploy stage started"
          }
        }
    }
    // post{
    //     always{
    //         echo "========always========"
    //     }
    //     success{
    //         echo "========pipeline executed successfully ========"
    //     }
    //     failure{
    //         echo "========pipeline execution failed========"
    //     }
    // }
}

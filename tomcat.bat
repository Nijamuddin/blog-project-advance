docker stop tomcat
docker rm tomcat
docker create --name tomcat -p 8080:8080 tomcat:8.0.45-jre8
docker cp target\cmad-blog-project-advance.war tomcat:/usr/local/tomcat/webapps
docker start tomcat
docker logs -f tomcat
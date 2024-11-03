gcloud auth login

docker tag org.devandrew.food.ordering.system/order.service:$1 northamerica-northeast2-docker.pkg.dev/food-ordering-system-377920/food-ordering-system-repository/order.service:$1
docker tag org.devandrew.food.ordering.system/payment.service:$1 northamerica-northeast2-docker.pkg.dev/food-ordering-system-377920/food-ordering-system-repository/payment.service:$1
docker tag org.devandrew.food.ordering.system/restaurant.service:$1 northamerica-northeast2-docker.pkg.dev/food-ordering-system-377920/food-ordering-system-repository/restaurant.service:$1
docker tag org.devandrew.food.ordering.system/customer.service:$1 northamerica-northeast2-docker.pkg.dev/food-ordering-system-377920/food-ordering-system-repository/customer.service:$1

docker push northamerica-northeast2-docker.pkg.dev/food-ordering-system-377920/food-ordering-system-repository/order.service:$1
docker push northamerica-northeast2-docker.pkg.dev/food-ordering-system-377920/food-ordering-system-repository/payment.service:$1
docker push northamerica-northeast2-docker.pkg.dev/food-ordering-system-377920/food-ordering-system-repository/restaurant.service:$1
docker push northamerica-northeast2-docker.pkg.dev/food-ordering-system-377920/food-ordering-system-repository/customer.service:$1
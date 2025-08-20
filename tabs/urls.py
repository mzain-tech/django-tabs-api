from django.urls import path
from .views import TabListCreateView, TabDetailView

urlpatterns = [
    path("", TabListCreateView.as_view(), name="tabs"),            # GET + POST
    path("<int:pk>/", TabDetailView.as_view(), name="tab-detail"), # GET, PUT, DELETE
]


# Ab flow aise hoga:

# List + create:

# GET /api/v1/tabs/
# POST /api/v1/tabs/


# Detail + update + delete:

# GET /api/v1/tabs/2/
# PUT /api/v1/tabs/2/
# DELETE /api/v1/tabs/2/
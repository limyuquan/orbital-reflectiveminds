# Define the __all__ variable
__all__ = ["dashboard_routes", "entry_routes", "login_routes"]

print('Initialising routes package')

# Import the submodules
from . import dashboard_routes
from . import entry_routes
from . import login_routes

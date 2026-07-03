# Global PyMySQL Monkey-Patch
# Must be at the very top before any Django imports
try:
    import pymysql
    from django.db.backends.mysql.base import DatabaseWrapper

    pymysql.version_info = (1, 4, 6, "final", 0)  # Overrides internal driver version check
    pymysql.install_as_MySQLdb()  # Register pymysql as the MySQLdb implementation

    # CRITICAL FIX: Hardcode the server version info string
    # This stops Django from attempting to connect to 'Localhost' to check if it's MariaDB or MySQL.
    DatabaseWrapper.mysql_server_info = "8.0.0-MySQL"

except ImportError:
    pass  # pymysql not available, will fall back to default MySQL driver
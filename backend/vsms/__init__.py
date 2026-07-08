# Global PyMySQL Monkey-Patch for Production Cloud Containers
# Must be at the very top before any Django imports
try:
    import pymysql
    
    pymysql.version_info = (1, 4, 6, "final", 0)  # Overrides internal driver version check
    pymysql.install_as_MySQLdb()  # Register pymysql as the MySQLdb implementation

    # MUST BE IMPORTED AFTER install_as_MySQLdb() to prevent crash!
    from django.db.backends.mysql.base import DatabaseWrapper

    # Stub out the server metadata parameters completely
    DatabaseWrapper.mysql_server_info = "8.0.0-MySQL"
    DatabaseWrapper.mysql_server_data = {"version": "8.0.0", "default_storage_engine": "InnoDB"}

except ImportError:
    pass  # pymysql not available, will fall back to default MySQL driver
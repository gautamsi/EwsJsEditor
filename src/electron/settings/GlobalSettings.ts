export class GlobalSettings {
        
        //  Defined registry value names
        private /* const */ static REG_KEY_APP_KEY_PATH: string = "Software\Microsoft\EWSEditor\";
        
        ///  <summary>
        ///  Gets or sets a bool indicating if the debug log be saved to a file
        ///  </summary>
        public static get ShouldSaveLogToFile(): boolean {
            return UserSettings.Default.ShouldSaveDebugOutput;
        }
        public static set ShouldSaveLogToFile(value: boolean)  {
            UserSettings.Default.ShouldSaveDebugOutput = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets the file path where the debug log should be saved
        ///  </summary>
        public static get LogFilePath(): string {
            //  If there is no UserSetting set a default
            if (String.IsNullOrEmpty(UserSettings.Default.DebugOutputFile)) {
                //  Try to get the MyDocuments folder
                let filePath: string = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                if (!String.IsNullOrEmpty(filePath)) {
                    filePath = System.IO.Path.Combine(filePath, "ewseditor.log");
                }
                
                //  If we can't get the MyDocuments folder then just try the root of C:\ and pray for rain
                if (String.IsNullOrEmpty(filePath)) {
                    filePath = "C:\ewseditor.log";
                }
                
                UserSettings.Default.DebugOutputFile = filePath;
            }
            
            return UserSettings.Default.DebugOutputFile;
        }
        public static set LogFilePath(value: string)  {
            UserSettings.Default.DebugOutputFile = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Defines the default page size used when issuing a CalendarView call
        ///  </summary>
        public static get CalendarViewSize(): number {
            return UserSettings.Default.CalendarViewSize;
        }
        public static set CalendarViewSize(value: number)  {
            UserSettings.Default.CalendarViewSize = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Defines the default page size used when issuing a FindFolder call
        ///  </summary>
        public static get FindFolderViewSize(): number {
            return UserSettings.Default.FindFolderViewSize;
        }
        public static set FindFolderViewSize(value: number)  {
            UserSettings.Default.FindFolderViewSize = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Defines the default page size used when issuing a FindItem call
        ///  </summary>
        public static get FindItemViewSize(): number {
            return UserSettings.Default.FindItemViewSize;
        }
        public static set FindItemViewSize(value: number)  {
            UserSettings.Default.FindItemViewSize = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Defines the default page size used when dumping folder contents
        ///  </summary>
        public static get DumpFolderViewSize(): number {
            return UserSettings.Default.DumpFolderViewSize;
        }
        public static set DumpFolderViewSize(value: number)  {
            UserSettings.Default.DumpFolderViewSize = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets a bool to override SSL certificate validation when sending requests
        ///  to an Exchange CAS server.  This is useful for test environments that
        ///  rarely have valid certificates.
        ///  </summary>
        public static get OverrideCertValidation(): boolean {
            return UserSettings.Default.OverrideCertValidation;
        }
        public static set OverrideCertValidation(value: boolean)  {
            UserSettings.Default.OverrideCertValidation = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets a bool indicating if detailed SSL certification information should be
        ///  written to the log
        ///  </summary>
        public static get EnableSslDetailLogging(): boolean {
            return UserSettings.Default.EnableSslDetailLogging;
        }
        public static set EnableSslDetailLogging(value: boolean)  {
            UserSettings.Default.EnableSslDetailLogging = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets a bool to allow following 302 redirects when performing Autodiscover
        ///  </summary>
        public static get AllowAutodiscoverRedirect(): boolean {
            return UserSettings.Default.AllowAutodiscoverRedirect;
        }
        public static set AllowAutodiscoverRedirect(value: boolean)  {
            UserSettings.Default.AllowAutodiscoverRedirect = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Enables SCP Lookups used for Autodisocver
        ///  </summary>
        public static get EnableScpLookups(): boolean {
            return UserSettings.Default.EnableScpLookups;
        }
        public static set EnableScpLookups(value: boolean)  {
            UserSettings.Default.EnableScpLookups = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Enables PreAuthenticate used for EWS calls.
        ///  </summary>
        public static get PreAuthenticate(): boolean {
            return UserSettings.Default.PreAuthenticate;
        }
        public static set PreAuthenticate(value: boolean)  {
            UserSettings.Default.PreAuthenticate = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets a bool to show the splash screen when EWSEditor is starting
        ///  EWSEditor.
        ///  </summary>
        public static get ShowSplash(): boolean {
            return UserSettings.Default.ShowSplash;
        }
        public static set ShowSplash(value: boolean)  {
            UserSettings.Default.ShowSplash = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  This string will be used as the UserAgent header value for all requests
        ///  sent from EWSEditor
        ///  </summary>
        public static get UserAgent(): string {
            return UserSettings.Default.UserAgent;
        }
        public static set UserAgent(value: string)  {
            UserSettings.Default.UserAgent = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  This bool indicates if the client timezone should be overrridden on the service object.
        ///  </summary>
        public static get OverrideTimezone(): boolean {
            return UserSettings.Default.OverrideTimezone;
        }
        public static set OverrideTimezone(value: boolean)  {
            UserSettings.Default.OverrideTimezone = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  This bool indicates if the client timezone should be overrridden on the service object.
        ///  </summary>
        public static get SelectedTimeZoneId(): string {
            return UserSettings.Default.SelectedTimeZoneId;
        }
        public static set SelectedTimeZoneId(value: string)  {
            UserSettings.Default.SelectedTimeZoneId = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  This indicates if the timeout should be overriden on the session object. 
        ///   
        ///  </summary>
        public static get OverrideTimeout(): boolean {
            return UserSettings.Default.OverrideTimeout;
        }
        public static set OverrideTimeout(value: boolean)  {
            UserSettings.Default.OverrideTimeout = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  This integer sets the timeout override on the session object
        ///  sent from EWSEditor
        ///  </summary>
        public static get Timeout(): number {
            return UserSettings.Default.Timeout;
        }
        public static set Timeout(value: number)  {
            UserSettings.Default.Timeout = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets a bool to override to indicate that the WebProxy settings should be overridden and set to the respose to getdefaultproxy
        ///  </summary>
        public static get SetDefaultProxy(): boolean {
            return UserSettings.Default.SetDefaultProxy;
        }
        public static set SetDefaultProxy(value: boolean)  {
            UserSettings.Default.SetDefaultProxy = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets a bool to override to indicate that the WebProxy settings should be overridden.
        ///  </summary>
        public static get SpecifyProxySettings(): boolean {
            return UserSettings.Default.SpecifyProxySettings;
        }
        public static set SpecifyProxySettings(value: boolean)  {
            UserSettings.Default.SpecifyProxySettings = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets the override proxy server name
        ///  </summary>
        public static get ProxyServerName(): string {
            return UserSettings.Default.ProxyServerName;
        }
        public static set ProxyServerName(value: string)  {
            UserSettings.Default.ProxyServerName = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets the override proxy server name
        ///  </summary>
        public static get ProxyServerPort(): number {
            return UserSettings.Default.ProxyServerPort;
        }
        public static set ProxyServerPort(value: number)  {
            UserSettings.Default.ProxyServerPort = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets a bool to override to indicate that the WebProxy settings should Bypass the proxy for a local address
        ///  </summary>
        public static get BypassProxyForLocalAddress(): boolean {
            return UserSettings.Default.BypassProxyForLocalAddress;
        }
        public static set BypassProxyForLocalAddress(value: boolean)  {
            UserSettings.Default.BypassProxyForLocalAddress = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets a bool to override to indicate that the WebProxy credentials should be overridden.
        ///  </summary>
        public static get OverrideProxyCredentials(): boolean {
            return UserSettings.Default.OverrideProxyCredentials;
        }
        public static set OverrideProxyCredentials(value: boolean)  {
            UserSettings.Default.OverrideProxyCredentials = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets the override proxy user
        ///  </summary>
        public static get ProxyServerUser(): string {
            return UserSettings.Default.ProxyServerUser;
        }
        public static set ProxyServerUser(value: string)  {
            UserSettings.Default.ProxyServerUser = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets the override proxy password
        ///  </summary>
        public static get ProxyServerPassword(): string {
            return UserSettings.Default.ProxyServerPassword;
        }
        public static set ProxyServerPassword(value: string)  {
            UserSettings.Default.ProxyServerPassword = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets the override proxy domain
        ///  </summary>
        public static get ProxyServerDomain(): string {
            return UserSettings.Default.ProxyServerDomain;
        }
        public static set ProxyServerDomain(value: string)  {
            UserSettings.Default.ProxyServerDomain = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets a bool to override to indicate that the TimeZoneContext should be set.
        ///  This is not set by the EWS Managed API if the server version is past 2007 SP1.
        ///  </summary>
        public static get AddTimeZoneContext(): boolean {
            return UserSettings.Default.AddTimeZoneContext;
        }
        public static set AddTimeZoneContext(value: boolean)  {
            UserSettings.Default.AddTimeZoneContext = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  This bool indicates if the client timezone Contex should be overrridden on the service object.
        ///  </summary>
        public static get SelectedTimeZoneContextId(): string {
            return UserSettings.Default.SelectedTimeZoneContextId;
        }
        public static set SelectedTimeZoneContextId(value: string)  {
            UserSettings.Default.SelectedTimeZoneContextId = value;
            UserSettings.Default.Save();
        }
        
        // 
        //         this.chkAdditionalHeader1.Text = GlobalSettings.EnableAdditionalHeader1;
        // this.txtAdditionalHeader1.Text = GlobalSettings.AdditionalHeader1;
        // this.txtAdditionalHeaderValue1.Text = GlobalSettings.AdditionalHeaderValue1;
        // this.chkAdditionalHeader2.Text = GlobalSettings.EnableAdditionalHeader2;
        // this.txtAdditionalHeader2.Text = GlobalSettings.AdditionalHeader2;
        // this.txtAdditionalHeaderValue2.Text = GlobalSettings.AdditionalHeaderValue2;
        // this.chkAdditionalHeader3.Text = GlobalSettings.EnableAdditionalHeader3;
        // this.txtAdditionalHeader3.Text = GlobalSettings.AdditionalHeader3;
        // this.txtAdditionalHeaderValue3.Text = GlobalSettings.AdditionalHeaderValue3;
        ///  <summary>
        ///  Enables setting of Additional Header 1
        ///  </summary>
        ///  
        public static get EnableAdditionalHeader1(): boolean {
            return UserSettings.Default.EnableAdditionalHeader1;
        }
        public static set EnableAdditionalHeader1(value: boolean)  {
            UserSettings.Default.EnableAdditionalHeader1 = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets Additional Header 1
        ///  </summary>
        public static get AdditionalHeader1(): string {
            return UserSettings.Default.AdditionalHeader1;
        }
        public static set AdditionalHeader1(value: string)  {
            UserSettings.Default.AdditionalHeader1 = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets Additional Header Value 1
        ///  </summary>
        public static get AdditionalHeaderValue1(): string {
            return UserSettings.Default.AdditionalHeaderValue1;
        }
        public static set AdditionalHeaderValue1(value: string)  {
            UserSettings.Default.AdditionalHeaderValue1 = value;
            UserSettings.Default.Save();
        }
        
        // 
        ///  <summary>
        ///  Enables setting of Additional Header 2
        ///  </summary>
        ///  
        public static get EnableAdditionalHeader2(): boolean {
            return UserSettings.Default.EnableAdditionalHeader2;
        }
        public static set EnableAdditionalHeader2(value: boolean)  {
            UserSettings.Default.EnableAdditionalHeader2 = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets Additional Header 2
        ///  </summary>
        public static get AdditionalHeader2(): string {
            return UserSettings.Default.AdditionalHeader2;
        }
        public static set AdditionalHeader2(value: string)  {
            UserSettings.Default.AdditionalHeader2 = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets Additional Header Value 2
        ///  </summary>
        public static get AdditionalHeaderValue2(): string {
            return UserSettings.Default.AdditionalHeaderValue2;
        }
        public static set AdditionalHeaderValue2(value: string)  {
            UserSettings.Default.AdditionalHeaderValue2 = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Enables setting of Additional Header 3
        ///  </summary>
        ///  
        public static get EnableAdditionalHeader3(): boolean {
            return UserSettings.Default.EnableAdditionalHeader3;
        }
        public static set EnableAdditionalHeader3(value: boolean)  {
            UserSettings.Default.EnableAdditionalHeader3 = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets Additional Header 3
        ///  </summary>
        public static get AdditionalHeader3(): string {
            return UserSettings.Default.AdditionalHeader3;
        }
        public static set AdditionalHeader3(value: string)  {
            UserSettings.Default.AdditionalHeader3 = value;
            UserSettings.Default.Save();
        }
        
        ///  <summary>
        ///  Gets or sets Additional Header Value 3
        ///  </summary>
        public static get AdditionalHeaderValue3(): string {
            return UserSettings.Default.AdditionalHeaderValue3;
        }
        public static set AdditionalHeaderValue3(value: string)  {
            UserSettings.Default.AdditionalHeaderValue3 = value;
            UserSettings.Default.Save();
        }
        
        private static GetAppRegKey(writable: boolean): RegistryKey {
            let appRegKey: RegistryKey = Registry.CurrentUser.OpenSubKey(REG_KEY_APP_KEY_PATH, writable);
            if ((appRegKey == null)) {
                let softRegKey: RegistryKey = Registry.CurrentUser.OpenSubKey("Software");
                if ((softRegKey == null)) {
                    DebugLog.WriteVerbose("Couldn't find HKCU\Software");
                    throw new KeyNotFoundException("Unable to create registry key.");
                }
                
                let msftRegKey: RegistryKey = softRegKey.OpenSubKey("Microsoft", true);
                if ((msftRegKey == null)) {
                    DebugLog.WriteVerbose("Couldn't find HKCU\Software\Microsoft");
                    throw new KeyNotFoundException("Unable to create registry key.");
                }
                
                appRegKey = msftRegKey.CreateSubKey("EWSEditor");
            }
            
            return appRegKey;
        }
    }
package com.spydermama.api.base;

public interface Actions {

	public interface Crud {
		String Add="Add";
		String Update="Update";
		String Delete="Delete";
		String View="View";
		String API="API";
	}
	public interface Components extends Crud {
		
	}
	public interface ComponentVersions extends Crud {
		String CreateBranch="CreateBranch";
		String PerformRelease="PerformRelease";
		String AddStatus="AddStatus";
		String SyncStatus="SyncStatus";
		String Start="Start";
		String Stop="Stop";
		String Deploy="Deploy";
		String Undeploy="Undeploy";
		String Remove="Remove";
	}
	public interface ComponentVersionProperties extends Crud {
		
	}
	public interface Releases extends Crud {
		
	}
	public interface ReleaseVersions extends Crud {
		String Deploy="Deploy";
		String Freeze="Freeze";
		String Unfreeze="Unfreeze";
		String Approve="Approve";
		String AddStatus="AddStatus";
	}
	public interface GlobalProperties extends Crud {
		
	}
	public interface DeploymentConfigurations extends Crud {
		
	}
	public interface ComponentTypes extends Crud {
		
	}
	public interface Hosts extends Crud {
		
	}
	public interface HostPatches extends Crud {
		
	}
	public interface DbInstances extends Crud {
		
	}
	public interface DbPatches extends Crud {
		
	}
	public interface Jobs{
		String Cancel="Cancel";
		String View="View";
		String API="API";
	}
	public interface Calendar{
		String VIEW="View";
	}
	public interface SystemProperties extends Crud {
		
	}
	public interface Roles extends Crud {
		
	}
	public interface Environments extends Crud {
		
	}
	public interface ReferenceData extends Crud {
		
	}
	public interface Productions extends Crud {
		
	}
	public interface ProductVersions extends Crud {
		
	}
	public interface ProductInstances extends Crud {
		
	}
	public interface Propertysets extends Crud {
		
	}
	public interface ScheduledJobs extends Crud {
		String Execute="Execute";
		String Terminate="Terminate";
	}
	public interface Credentials extends Crud {
		String ViewPassword="ViewPassword";
	}
}

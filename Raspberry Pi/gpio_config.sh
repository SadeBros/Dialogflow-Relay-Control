#!/bin/sh

# Define some variables

ERROR_MESSAGE="use [script_name] [Arg1: PIN number] [Arg2: in or out]"

case $# in 
	
	1) 
		echo $1 > /sys/class/gpio/unexport
		echo "GPIO pin unexported"
		;;

	2)  	
		echo $1 > /sys/class/gpio/export
		sleep 1
		echo $2 > /sys/class/gpio/gpio$1/direction
		echo "GPIO pin is set"
		;;

	*) 	
		echo $ERROR_MESSAGE
		;;
esac	
